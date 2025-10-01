from fastapi import FastAPI
import pickle
import requests
import pandas as pd

app = FastAPI()

# Загружаем данные
movies = pickle.load(open("movies_list.pkl", "rb"))
similarity = pickle.load(open("similarity.pkl", "rb"))

def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=397b741a79d8ac60c51f7eaa71316d61&language=en-US"
    data = requests.get(url).json()
    poster_path = data.get("poster_path")
    if poster_path:
        return "https://image.tmdb.org/t/p/w500/" + poster_path
    return None

@app.get("/movies")
def get_movies():
    return movies[['id', 'title']].to_dict(orient="records")

@app.get("/recommend/{movie_title}")
def recommend(movie_title: str):
    index = movies[movies['title'] == movie_title].index[0]
    distances = sorted(list(enumerate(similarity[index])),
                       reverse=True, key=lambda vector: vector[1])
    recommended = []
    for i in distances[1:6]:
        movie_id = movies.iloc[i[0]].id
        title = movies.iloc[i[0]].title
        poster = fetch_poster(movie_id)
        recommended.append({"title": title, "poster": poster})
    return recommended

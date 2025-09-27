# import streamlit as st
# import pickle
# import requests

# def fetch_poster(movie_id):
#      url = "https://api.themoviedb.org/3/movie/{}?api_key=397b741a79d8ac60c51f7eaa71316d61&language=en-US".format(movie_id)
#      data=requests.get(url)
#      data=data.json()
#      poster_path = data['poster_path']
#      full_path = "https://image.tmdb.org/t/p/w500/"+poster_path
#      return full_path

# movies = pickle.load(open("movies_list.pkl", 'rb'))
# similarity = pickle.load(open("similarity.pkl", 'rb'))
# movies_list=movies['title'].values

# st.header("Movie Recommender System")

# import streamlit.components.v1 as components

# imageCarouselComponent = components.declare_component(
#     "image-carousel-component",
#     path="frontend/build"
# )
# imageUrls = [
#     fetch_poster(1632),
#     fetch_poster(299536),
#     fetch_poster(17455),
#     fetch_poster(2830),
#     fetch_poster(429422),
#     fetch_poster(9722),
#     fetch_poster(13972),
#     fetch_poster(240),
#     fetch_poster(155),
#     fetch_poster(598),
#     fetch_poster(914),
#     fetch_poster(255709),
#     fetch_poster(572154)
# ]

# selected_image = imageCarouselComponent(imageUrls=imageUrls, height=200)
# st.write("Вы выбрали:", selected_image)

# def recommend(movie):
#     index=movies[movies['title']==movie].index[0]
#     distance = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector:vector[1])
#     recommend_movie=[]
#     recommend_poster=[]
#     for i in distance[1:6]:
#         movies_id=movies.iloc[i[0]].id
#         recommend_movie.append(movies.iloc[i[0]].title)
#         recommend_poster.append(fetch_poster(movies_id))
#     return recommend_movie, recommend_poster



# if st.button("Show Recommend"):
#     movie_name, movie_poster = recommend(selectvalue)
#     col1,col2,col3,col4,col5=st.columns(5)
#     with col1:
#         st.text(movie_name[0])
#         st.image(movie_poster[0])
#     with col2:
#         st.text(movie_name[1])
#         st.image(movie_poster[1])
#     with col3:
#         st.text(movie_name[2])
#         st.image(movie_poster[2])
#     with col4:
#         st.text(movie_name[3])
#         st.image(movie_poster[3])
#     with col5:
#         st.text(movie_name[4])
#         st.image(movie_poster[4])
import streamlit as st
import pickle
import requests
import os
from pathlib import Path
import streamlit.components.v1 as components

# -----------------------------
# Функция для получения постера
# -----------------------------
def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=397b741a79d8ac60c51f7eaa71316d61&language=en-US"
    data = requests.get(url).json()
    poster_path = data.get("poster_path")
    if poster_path:
        return f"https://image.tmdb.org/t/p/w500/{poster_path}"
    return ""
print(fetch_poster(2))
# -----------------------------
# Загрузка данных фильмов
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
movies = pickle.load(open(os.path.join(BASE_DIR, "movies_list.pkl"), "rb"))
similarity = pickle.load(open(os.path.join(BASE_DIR, "similarity.pkl"), "rb"))
movies_list = movies['title'].values

# -----------------------------
# Заголовок приложения
# -----------------------------
st.header("Movie Recommender System")

# -----------------------------
# Выбор фильма из списка
# -----------------------------
selectvalue = st.selectbox("Select movie from dropdown", movies_list)

# -----------------------------
# Функция рекомендаций
# -----------------------------
def recommend(movie):
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movies = []
    recommended_posters = []
    for i in distances[1:6]:
        movie_id = movies.iloc[i[0]].id
        recommended_movies.append(movies.iloc[i[0]].title)
        recommended_posters.append(fetch_poster(movie_id))
    return recommended_movies, recommended_posters

# -----------------------------
# Отображение рекомендаций
# -----------------------------
if st.button("Show Recommend"):
    movie_names, movie_posters = recommend(selectvalue)

  # -----------------------------
# Генерация HTML для карусели
# -----------------------------
    carousel_html = """
    <div style="
        display: flex;
        overflow-x: auto;   /* Горизонтальный скролл */
        overflow-y: hidden; /* Вертикальный скролл убран */
        gap: 10px;
        padding: 10px;
        width: max-content;
    ">
    """
    for poster, name in zip(movie_posters, movie_names):
        carousel_html += f"""
        <div style="flex: 0 0 auto; text-align: center;">
            <img src="{poster}" style="height:200px; border-radius:10px;"><br>
            <small>{name}</small>
        </div>
        """
    carousel_html += "</div>"

    components.html(carousel_html, height=220, scrolling=True)


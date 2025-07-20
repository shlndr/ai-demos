import streamlit as st
import requests

st.title('Medical Image Classifier')

uploaded_file = st.file_uploader('Upload an X-ray image', type=['png', 'jpg', 'jpeg'])

if uploaded_file is not None:
    st.image(uploaded_file, caption='Uploaded Image', use_column_width=True)
    with st.spinner('Classifying...'):
        files = {'file': (uploaded_file.name, uploaded_file, uploaded_file.type)}
        try:
            response = requests.post('http://localhost:8000/upload', files=files)
            if response.ok:
                result = response.json().get('result', 'Unknown')
                st.success(f'Result: {result}')
            else:
                st.error('Error: Could not get prediction from backend.')
        except Exception as e:
            st.error(f'Error: {e}') 
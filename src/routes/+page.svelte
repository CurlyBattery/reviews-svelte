<script>
  import homeImage from '$lib/assets/home-image.png';
</script>

<div>
    <h2>Пиши отзывы или читай рецензии по интересующим тебя темам.</h2>
    <p>
        <img alt="The home image" src={homeImage} /> Этот сайт посвящен рецензиям на абсолютно рандомные темы
    </p>
</div>


<style>
    div {
        font-family: 'Trebuchet MS', sans-serif;
        font-size: 1.5em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100%;
        background: #193B68;
        background: linear-gradient(90deg, rgba(25, 59, 104, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(88, 21, 53, 1) 100%);
    }
    h2 {
        color: white;
        width: 70%;
        font-size: 2.4em;
    }
    p {
        color: white;
        background: rgba(0, 0, 0, 0.38);
        margin: 1.5em;
        padding:  .5em 1em;
        border-radius: 45px;
        box-shadow: 5px 5px 10px #581535FF,
        -5px -5px 10px #193B68FF;
        display: flex;
        align-items: center;
    }
    p img {
        width: 40px;
        height: auto;
        margin-right: 10px;
    }
</style>

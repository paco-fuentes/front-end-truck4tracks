# truck4tracks
#### by Paco Fuentes

<img style="border-radius:0.7em" src="./public/img_readme/prelogo-1.png" align= "center"/>

---

<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#objetivo-🎯">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto-🔎">Sobre el proyecto</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#install">Install</a></li>
    <li><a href="#views">Views</a></li>
    <li><a href="#what's next?">What's next?</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

---

## Objetive 🎯

The purpose of this project is to carry out a comprehensive implementation using fullstack development technologies, contributing to this repository with the front-end section and deploying it on AWS. JavaScript with React and Redux has been employed, in addition to CSS for design.

This is an MVP of a social network with an interface entirely based on a system of cards of different sizes. The platform is designed to create a community of people interested in sharing audio tracks hosted on other services.

'Bands' are created, groups where the user with the role of 'band leader' creates a 'multitrack', a playlist, and proposes a theme. Other users can join and collaborate by uploading their own tracks, and when the 'band leader' deems it appropriate, a 'song', a collaborative audio track, is published as a result.

---

## About the Project 🔎
Front-end MVP for a Social Platform, emphasizing sound sharing and fostering collaborative composition creation among users. This project represents the culmination of the GeeksHubs Academy fullstack developer bootcamp.

---

## Stacks
<div align="center">
    <a href="https://www.reactjs.com/">
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    </a>
    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
        <img src="https://img.shields.io/badge/JavaScript-EFD81D?style=for-the-badge&logo=javascript&logoColor=black" />
    </a>
    <a href="https://aws.amazon.com/">
        <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900" />
    </a>
    <a href="https://redux.js.org/">
        <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
        <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
        <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
    </a>
    <a href="https://git-scm.com/">
        <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
    </a>
    <a href="https://jwt.io/">
        <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
    </a>
</div>


 ---

## Deploy 🚀
<div align="center">
    <a href="https://despliegue.dkttbnrz8nnws.amplifyapp.com/"><strong>URL to AWS test deploy</strong></a>🚀🚀🚀
</div>

---

## Install

This is frontend app of a previously finished backend project on:

https://github.com/paco-fuentes/API-truck-4-tracks 

Download and follow install intructions. You can populate your database with included sql insert files.

Then clone this repository.

Open terminal on project folder:

1. Clone this repo
```bash
      git clone url
```
2. Install dependencies

```bash
      npm i
```

3. Run this project in dev mode: 

```bash
      npm run dev
```

4. Press 'o' and ENTER on the terminal window to open localhost: on your browser.

---

 ## Views

 ### Guest:

 /home : main view

 <a  href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/home.png"/>
</a>

 /register : user register view

 <a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/register.png"/>
</a>

/ login : login registered users and admin

<a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/login.png"/>
</a>

/register and login overview

 <a href="">
    <img style="border-radius:0.5em" src= "./public/gifs_readme/reg-log.gif"/>
</a>

/bands : select band view

<a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/bands.png"/>
</a>

/band/id : select band view (detail)

<a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/band-1.png"/>
</a>

/band/id : select band view (detail)

<a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/band-2.png"/>
</a>


### User

 / main : user overview

 <a href="">
    <img style="border-radius:0.5em" src= "./public/gifs_readme/overview.gif"/>
</a>

/profile : profile view (detail)

<a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/profile.png"/>
</a>

/profile : edit profile and create a new band

<a href="">
    <img style="border-radius:0.5em" src= "./public/gifs_readme/profile-2.gif"/>
</a>

/bandmembers : manage band

<a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/members.png"/>
</a>

/band : chat

<a href="">
    <img style="border-radius:0.5em" src= "./public/gifs_readme/chat.gif"/>
</a>

/band : sharing a track with your band

<a href="">
    <img style="border-radius:0.5em" src= "./public/gifs_readme/upload-2.gif"/>
</a>

### Admin

/admin : get all users and delete selected user

<a href="">
    <img style="border-radius:0.5em" src= "./public/img_readme/admin.png"/>
</a>

/admin : overview

<a href="">
    <img style="border-radius:0.5em" src= "./public/gifs_readme/admin.gif"/>
</a>

---

## What's next?

In the future, users will have the ability to search for each other based on styles, skills, and instruments, as well as to publish articles for reading and proposals from staff, collaborators, and sponsors.

Next additions:

- Redux
- Tailwind

---

## License

This project is under an MIT license.

---

## Contact

Paco Fuentes. 2023

<a href = "mailto:pacofuentes.work@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/paco-fuentes-805a40290/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>



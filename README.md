## About this project
This project was maded for the Cloudflare AI Challenge from <a href="dev.to" target="_blank">dev.to</a>, it allows you to create notes with or without the help of artificial intelligence using two AI Workers models from Cloudflare to generate text (@cf/meta/llama-2-7b-chat-fp16) and generate images (@cf/stabilityai/stable-diffusion-xl-base-1.0).

The project was splitted in two repositories, check the repo related to Cloudflare Worker for this app: [Nottia Worker](https://github.com/cn-2k/nottia-worker)

## Generating a note based on user prompt
<div align="center">
    <img src="https://github.com/cn-2k/nottia/assets/59366705/fcf60304-008a-4082-986e-ca0d39881ac9"">
</div>

## Creating a image based on user prompt
<div align="center">
    <img src="https://github.com/cn-2k/nottia/assets/59366705/5c742fdf-095c-4aba-8dac-ae814e34287e"">
</div>

## Techs used to build this project

<table>
  <tbody>
    <tr>
    <tr>
      <td style="font-weight: bold">Frontend</code></td>
      <td>
        <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer"><code>Vuejs</code></a> -
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><code>TypeScript</code></a> -
        <a href="https://nuxt.com/" target="_blank" rel="noopener noreferrer"><code>Nuxtjs</code></a> -
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"><code>TailwindCSS</code></a> -
        <a href="https://shadcn-vue.com/" target="_blank" rel="noopener noreferrer"><code>Shadcn/vue</code></a>
      </td>
    </tr>
  </tbody>
</table>

## Installation Instructions

### Requirements

- [`Git`](https://git-scm.com/)
- [`npm`](https://www.npmjs.com/)
- [`Node`](https://nodejs.org/)

### Clone the repo

```bash
# Clone the repo with git clone command
$ git clone https://github.com/cn-2k/nottia.git
# Go to project folder
$ cd nottia
```

### Install dependencies and start the dev server

```bash
# Inside the project folder, install the necessary dependencies with npm install
$ npm install
# Start the server
$ npm run dev
```

After this the server will be avaiable on: [localhost:3000](http://localhost:3000/)

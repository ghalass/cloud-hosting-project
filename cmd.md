## create project

npx create-next-app@latest ===> npx create-next-app@14
name .
typescript yes
elint yes
tailwind css yes
src yes
app router yes
import alias no

## install react-icons

npm i react-icons

## install zod

npm i zod

## install prisma

npm i -D prisma
npx prisma init
npx prisma migrate dev
npx prisma studio

## install bcrypt

npm i bcryptjs
npm i -D @types/bcryptjs ==> because our project is in typescript

## install jwt

npm i jsonwebtoken
npm i -D @types/jsonwebtoken ==> because our project is in typescript

## install cookie

npm i cookie
npm i -D @types/cookie ==> because our project is in typescript

## install axios

npm i axios

## deploy in vervel

Build Command : prisma generate && prisma migrate deploy && next build

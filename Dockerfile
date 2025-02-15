# 1️⃣ Use an official Node.js image as the base
FROM node:18-alpine AS builder

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# 3️⃣ Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy the entire project into the container
COPY . .

# 6️⃣ Build the Next.js application
RUN npm run build

# 7️⃣ Start a new container with only the necessary files
FROM node:18-alpine

# 8️⃣ Set the working directory again
WORKDIR /app

# 9️⃣ Copy only the built files and dependencies from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 1️⃣0️⃣ Expose the Next.js default port
EXPOSE 3000

# 1️⃣1️⃣ Define the command to run the app
CMD ["npm", "run", "start"]

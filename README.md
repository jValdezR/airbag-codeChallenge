# airbag-codeChallenge by Jesus Daniel Valdez Rodriguez

## Run in Development

1. Clone the repository
2. Run
   ```
   npm install
   ```
3. Clone the __.env.template__ file and rename the copy to __.env__

4. Fill in the environment variables defined in the ```.env```

5. Create the database
   ```
   npm run db:create
   ```
6. Create the container for the application (application and database)
   ```
   docker-compose up --build
   ```
   This step will create a container with the application accepting requests on the port you have defined in the environment variables and the database on port 5432.

7. Run the Node.js application in dev mode (OPTIONAL)
   ```
   npm run dev
   ```

8. Check the documentation in ```/api/docs/```

## Used Stack
* PostgreSQL
* Node Express

## Visit the API on Railway:
https://airbag-codechallenge-production.up.railway.app/api/
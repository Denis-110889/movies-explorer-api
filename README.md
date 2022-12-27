# Movies explorer

## Frontend

The project is written in `HTML`, `CSS`, `JSX` using `React Fraemwork`. Data came from the backend and was sent to it through a class components using `RestAPI`.

```JavaScript
import { useForm } from "react-hook-form";
```

When you can connect register, watch, errors methods and handleSubmit function.

```JavaScript
const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm({
  mode: "onBlur",
});

const [registrationName, registrationEmail, registrationPassword] = watch([
  "registrationName",
  "registrationEmail",
  "registrationPassword",
]);

function onSubmit() {
  handleRegister(registrationName, registrationEmail, registrationPassword);
}
```

They monitor the text input fields and if they do not match the pattern, they will give an error

```JavaScript
<input
  {...register("registrationEmail", {
    required: "Введите e-mail",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email должен быть с @",
    },
  })}
  className="register__input"
  type="text"
  placeholder="E-mail"
/>
<span className="register__errors">
  {errors?.registrationEmail?.message}
</span>
```

## Backend

I used `Node.js` witch `Express Fraemwork` and `MongoDB` database to process and save data.

## Deploy

The project was build on the AWS cloud using `Nginx` and `PM2` to resume work in crash case.

```JS
  scripts: {
      "deploy": "npm run build && scp -r ./build/* ubuntu@ec2-3-72-147-222.eu-central-1.compute.amazonaws.com:/home/ubuntu/diplom/movies-explorer-frontend/"
  }
```

## Running

You can run both use:
```
npm i && npm run start
```

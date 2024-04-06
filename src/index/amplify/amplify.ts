import {Amplify} from "aws-amplify";

export const configureAmplify = () => {

  console.log({
    env: process.env.COGNITO_CLIENT_ID

  })
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.COGNITO_USER_POOL_ID!,
        userPoolClientId:
          process.env.COGNITO_CLIENT_ID!,
      },
    },
  });
};
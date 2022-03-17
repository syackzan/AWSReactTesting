import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_Jix4tZ5jh',
    ClientId: '5en2sqr3i5slg8dovi29fblfa4'
}

export default new CognitoUserPool(poolData);
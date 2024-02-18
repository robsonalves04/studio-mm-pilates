import { SignUpPage } from '../views/pages/public/sign-up-page';
import { Route, Routes } from 'react-router-dom';

export const AppPublicRouter = () => {

    return (
        <Routes>
            <Route path="/" Component={SignUpPage} />
        </Routes>
    )
}
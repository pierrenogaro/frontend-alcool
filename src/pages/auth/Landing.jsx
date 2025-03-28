import {GoogleLogin} from "@react-oauth/google";

export function LandingPage() {
    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => console.log("Login Failed")}
            />
        </>
    )
}
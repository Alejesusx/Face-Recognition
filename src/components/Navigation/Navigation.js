import React from 'react';

const Navigation = ( { onRouteChange, isSignedIn }) =>{
if (isSignedIn){
    return(
    <nav style={{display: 'flex', justifyContent: 'flex-end', width:'90%'}}>
        <p onClick={() => onRouteChange('signout')} className="f3 dim link black underline pointer   pa2 br3">Sign Out</p>
    </nav>
    )
}else {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end', width:'90%'}}>
        <p onClick={() => onRouteChange('register')} className="f3 dim link black underline pointer pa2  br3">Register</p>
        <p onClick={() => onRouteChange('signin')} className="f3 dim link black underline pointer pa2  br3">Sign In</p>
    </nav>  
    )
}
    

}

export default Navigation
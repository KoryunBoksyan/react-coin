import React from "react";

//  * 
//  * 
//  * @param {Object} response 
//  */
export const handleResponse = (response)=> {
    return response.json()
    .then(json => response.ok ? json : Promise.reject(json));
}

export const renderChangePercent = (percent) =>{
    if(percent > 0){
        return (
            <span className="percent-raised">
                {percent}% &uarr;                    
            </span>
        );
    }
    if(percent < 0){
        return (
            <span className="percent-fallen">
                {percent}% &darr;                    
            </span>
        );
     }
    return <span>{percent}</span>
}

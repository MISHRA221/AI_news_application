import React, { useState, useEffect } from 'react';

import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import NEWScards from './components/newscards/NEWScards';
import useStyles from './styles.js';

const alan_key="ddace850fc4de19aae5c4f1dc9197ac92e956eca572e1d8b807a3e2338fdd0dc/stage"

const app = () => {
    const [newsarticles, setnewsarticles] = useState([]);
    const [activearticles, setactivearticle]=useState(-1);
    const classes= useStyles();

    useEffect(() => {
        alanBtn({ 
            key: alan_key,
            onCommand: ({command, articles}) => {
                if(command === 'NEWHEADLINES'){
                    setnewsarticles(articles);
                    setactivearticle(-1);
                }
                else if(command === 'highlight'){
                    setactivearticle((prevactivearticle) => prevactivearticle+1);
            }
            else if(command === 'open'){

               const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
               const article=articles[parsedNumber -1];
               
               if(parsedNumber> 20){
                alanBtn().playText('please try that again.')
               }
               else if(article){
               window.open(article.url, '_blank' );
               alanBtn().playText('opening...');
               }
            }
        }});
},[]) 


return(
    <div>
        <div className={classes.logoContainer}>
        <img src= "https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt='alan logo'></img>
       </div>
        <newscards articles={newsarticles} activearticles={activearticles}></newscards>
    </div>
);
}

export default app;

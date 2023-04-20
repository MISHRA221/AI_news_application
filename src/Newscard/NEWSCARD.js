import React, {useState, useEffect, createRef} from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './style.js';

const NEWSCARD = ({article:{ description, publishedAt, source, title, url, urlToImage}, i, activearticles}) => {
    const [elrefs, setelrefs]=useState([]);
    const classes=useStyles();
    const scrollToRef= (ref) => window.scroll(0, ref.current.offsetTop= 50);

    useEffect(() => {
        setelrefs((refs) => Array(20).fill().map((_ ,j) => refs[j] || createRef()));
    },[]);

    useEffect(()=> {
         if(i === activearticles && elrefs[activearticles]){
            scrollToRef(elrefs[activearticles])
         }
    }, [i, activearticles, elrefs]);

    return (
        <Card ref={elrefs[i]} className={classNames(classes.card, activearticles === i ? classes.activeCard: null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage || 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterbuttonvariant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}> 
                <button size='small' color='primary'>Learn More</button>
                <Typography variant='hs' color='textSecondary'>{i+1}</Typography>
            </CardActions>
        </Card>
    )
}
export default NEWSCARD;

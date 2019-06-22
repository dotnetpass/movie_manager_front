import styles from "./movieList.less";
import router from "umi/router";
import React from "react";
import {List, Icon} from 'antd';

const MovieList = ({data, loading, loadMore, like}) => {
    const handleLike = (e, id) => {
        e.stopPropagation();
        if (like)
            like(id)
    }
    const moviesBlock = <List
        grid={{
            gutter: 20, xs: 3, sm: 4, md: 5, lg: 6
        }}
        loadMore={loadMore}
        loading={loading}
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <div className={styles.card} onClick={()=>router.push(`/movie/${item.id}`)}>
                    <img className={styles.img} src={item.img && item.img.replace("w.h", '600.800')}/>
                    <div className={styles.name}>
                        {item.name || ''}
                    </div>
                    <div className={styles.score}>
                        {item.score || '0.0'}
                    </div>
                    <Icon type="heart" className={styles.like} onClick={(e)=>handleLike(e, item.id)}/>
                    <div className={styles.tags}>
                        {(item.category || '').split(',').map(e => <span key={e}
                                                                         className={styles.tag}>{e}</span>)}
                    </div>
                </div>
            </List.Item>
        )}
    />
    return moviesBlock;
}

export default MovieList;
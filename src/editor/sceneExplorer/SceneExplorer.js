import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { setFocusedPage } from '../../store/actions';

const buttonStyle = {
    textTransform: 'none', 
    fontSize: 24
}

function SceneExplorer(props) {
    function handlePageButtonClick(id) {
        if (id !== props.pages.focusedPage) {
            props.setFocusedPage({ focusedPage: id });
        }
    }

    function renderPageList() {
        const pageList = Object.keys(props.pages.map).map((id, i) => {
            return (
                <Grid item xs={12} key={`Page-${i}`}>
                    <Button fullWidth style={buttonStyle} onClick={() => handlePageButtonClick(id)}>{props.pages.map[id].title || `Untitled Page ${i}`}</Button>
                </Grid>
            );
        });
        return pageList;
    }

    return (
        <div style={{marginTop: 100}}>
            <Grid container>
                {renderPageList()}
            </Grid>
        </div>
    );
}

function mapPagesToProps({ pages }) {
    return { pages };
}

export default connect(mapPagesToProps, { setFocusedPage })(SceneExplorer);
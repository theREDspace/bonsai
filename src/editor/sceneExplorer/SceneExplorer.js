import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { setFocusedPage, newPage, deletePage } from '../../store/actions';
import { uuid } from '../../lib/math';

const buttonStyle = {
    textTransform: 'none', 
    fontSize: 24
}

function SceneExplorer(props) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    function handlePageButtonClick(id) {
        if (id !== props.pages.focusedPage) {
            props.setFocusedPage({ focusedPage: id });
        }
    }

    function handleNewPageClick() {
        const id = uuid();
        props.newPage({ id });
        props.setFocusedPage({ focusedPage: id });
    }

    function handleDeletePageClick() {
        setIsDialogOpen(true);
    }

    function handleCancelDeleteClick() {
        setIsDialogOpen(false);
    }

    function handleConfirmDeleteClick() {
        setIsDialogOpen(false);
        props.deletePage({ id: props.pages.focusedPage });
    }

    function renderPageList() {
        const pageList = props.pages.order.map((id, i) => {
            const inFocus = id === props.pages.focusedPage;
            return (
                <Grid item xs={12} key={`Page-${id}`}>
                    <Button 
                        fullWidth 
                        style={buttonStyle} 
                        onClick={() => handlePageButtonClick(id)}
                        variant={inFocus ? "contained" : null}
                        color={inFocus ? "primary" : null}
                    >
                        {props.pages.map[id].title || `Untitled Page`}
                    </Button>
                </Grid>
            );
        });
        return pageList;
    }

    return (
        <div style={{marginTop: 100}}>
            <Button variant="contained" onClick={handleNewPageClick}>NEW PAGE</Button>
            <Button variant="contained" onClick={handleDeletePageClick} disabled={props.pages.order.length == 1}>DELETE PAGE</Button>
            <Grid container>
                {renderPageList()}
            </Grid>

            <Dialog
                open={isDialogOpen}
            >
                <DialogTitle>{"Are you sure you want to delete this page?"}</DialogTitle>
                <DialogActions>
                    <Button color="secondary" onClick={handleCancelDeleteClick}>Cancel</Button>
                    <Button color="primary" onClick={handleConfirmDeleteClick}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function mapPagesToProps({ pages }) {
    return { pages };
}

export default connect(mapPagesToProps, { newPage, deletePage, setFocusedPage })(SceneExplorer);
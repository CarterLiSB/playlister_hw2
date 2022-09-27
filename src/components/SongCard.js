import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false,
            isHover: false, 
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }
    handleMouseEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            isHover: true 
        }));
    }
    handleMouseLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            isHover: false
        }));
    }
    handleDeleteSong = (event) => {
        event.stopPropagation();
        //console.log(this.props.deleteSongCallback)
        this.props.deleteSongCallback(this.getItemNum() - 1);
    }

    getItemNum = () => {
        return this.props.id.substring("playlist-song-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        // console.log("num: " + num);
        let itemClass = "playlister-song";
        if (this.state.draggedTo) {
            itemClass = "playlister-song-dragged-to";
        }
        if (this.state.isHover) {
            itemClass += " unselected-list-card";
        }
        let link = "https://www.youtube.com/watch?v=" + song.youTubeId;
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                draggable="true"
            >
                {num}. <a href = {link}>{song.title} by {song.artist}</a>
                
                <input
                        type="button"
                        id={"delete-song-" + num}
                        className="playlister-button"
                        onClick={this.handleDeleteSong}
                        value={"\u2715"} />
            </div>
        )
    }
}
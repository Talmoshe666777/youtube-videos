import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import youtube from '../api/youtube';
import VideoDetail from './VideoDetail';

class App extends React.Component {
    constructor(props) {
        super(props);
        //this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }
    state = {
        videos: [],
        selectedVideo: null
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    componentDidMount(){
        this.onTermSubmit('Hail to the king');
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get( '/search', {
            params: {
                q: term
            }
        });
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
         });
    }

    render(){
        return (
            <div className="ui container" style={{marginTop: '20px'}}>
                <SearchBar onFormSubmit={this.onTermSubmit} placeholder="Naruto" />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList  onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

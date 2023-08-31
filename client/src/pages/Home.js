// all good do not change
import React from 'react';
import SearchAlbums from '../pages/SearchAlbums';

const Home = () => {
    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3">
                    <SearchAlbums />
                </div>
            </div>
        </main>
    );
};

export default Home;
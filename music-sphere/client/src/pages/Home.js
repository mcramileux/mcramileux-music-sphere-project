//will edit
import React from 'react';
import { useQuery } from '@apollo/client';

//will edit this part - searchAlbums engine will place here
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';// will edit

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS); //will edit
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
            {/* will edit */}
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            // will edit
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

// import React from 'react';
// import { useQuery } from '@apollo/client';

// // import ThoughtList from '../components/ThoughtList';
// // import ThoughtForm from '../components/ThoughtForm';
// import SearchAlbums from '../components/SearchAlbums';
// import SavedAlbums from '../components/SavedAlbums';

// // import { QUERY_THOUGHTS } from '../utils/queries';
// import { GET_ME } from '../utils/queries';

// const Home = () => {
// //   const { loading, data } = useQuery(QUERY_THOUGHTS);
// const { loading, data } = useQuery(GET_ME);
//   const thoughts = data?.thoughts || [];

//   return (
//     <main>
//       <div className="flex-row justify-center">
//         <div
//           className="col-12 col-md-10 mb-3 p-3"
//           style={{ border: '1px dotted #1a1a1a' }}
//         >
//           {/* <ThoughtForm /> */}
//           <SearchAlbums />
//         </div>
//         <div className="col-12 col-md-8 mb-3">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             // ThoughList was replaced by SavedAlbums
//             <SavedAlbums
//               thoughts={thoughts}
//               title="Some Feed for Thought(s)..."
//             />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home;
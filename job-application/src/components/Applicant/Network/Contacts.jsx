import React from 'react';

// Dummy data for sections
const peopleYouMayKnow = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager', imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Alice Johnson', position: 'Data Scientist', imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 4, name: 'Bob Brown', position: 'UI/UX Designer', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

const groups = [
  { id: 1, name: 'Tech Innovators', description: 'A group for tech enthusiasts' },
  { id: 2, name: 'Frontend Developers', description: 'A group for frontend developers' },
  { id: 3, name: 'Data Science Community', description: 'A group for data science professionals' },
];

const popularTechStacks = [
  { id: 1, name: 'React.js', description: 'A popular JavaScript library for building user interfaces' },
  { id: 2, name: 'Node.js', description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
  { id: 3, name: 'Python', description: 'A powerful programming language often used in data science and web development' },
];

const Contacts = () => {
  return (
    <div className="contacts-container">
      <h2>Others</h2>

      {/* Flexbox Container for 2-column layout */}
      <div className="contacts-sections">

        {/* Suggestions Section */}
        <div className="section suggestions-section">
          <h3>Suggestions</h3>
          <ul>
            {peopleYouMayKnow.map(person => (
              <li key={person.id} className="suggestion-item">
                <div className="suggestion-img">
                  <img src={person.imgUrl} alt={person.name} />
                </div>
                <div className="suggestion-info">
                  <span className="suggestion-name">{person.name}</span>
                  <span className="suggestion-position">{person.position}</span>
                </div>
                <button className="connect-button">Connect</button>
              </li>
            ))}
          </ul>
        </div>

        {/* People You May Know Section */}
        <div className="section people-you-may-know">
          <h3>People You May Know</h3>
          <ul>
            {peopleYouMayKnow.map(person => (
              <li key={person.id} className="suggestion-item">
                <div className="suggestion-img">
                  <img src={person.imgUrl} alt={person.name} />
                </div>
                <div className="suggestion-info">
                  <span className="suggestion-name">{person.name}</span>
                  <span className="suggestion-position">{person.position}</span>
                </div>
                <button className="connect-button">Connect</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Groups Section */}
        <div className="section groups-section">
          <h3>Groups</h3>
          <ul>
            {groups.map(group => (
              <li key={group.id} className="suggestion-item">
                <div className="group-info">
                  <span className="group-name">{group.name}</span>
                  <p className="group-description">{group.description}</p>
                </div>
                <button className="join-button">Join</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Tech Stacks Section */}
        <div className="section tech-stack-section">
          <h3>Popular Tech Stacks</h3>
          <ul>
            {popularTechStacks.map(stack => (
              <li key={stack.id} className="suggestion-item">
                <div className="tech-stack-info">
                  <span className="tech-stack-name">{stack.name}</span>
                  <p className="tech-stack-description">{stack.description}</p>
                </div>
                <button className="learn-more-button">Learn More</button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Contacts;

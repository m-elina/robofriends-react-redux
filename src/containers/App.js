import React from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
// import {robots} from './robots.js'; brauchen wir nicht mehr /* weitere Component für den Inhalt der Cards importieren, {} weil Component mehrere Bestandteile hat*/
import Searchbox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
       onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
       onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends React.Component {
    // fügt die Roboter aus robots.js in den Array oben ein
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const {searchField, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        if (isPending) { /* als Fallback, wenn es zu lange lädt, bedeutet, wenn länge der Robots gleich 0, also kein Roboter geladen */
            return <h1>Loading</h1>
        } else {
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <Searchbox searchChange={onSearchChange}/> {/* function wird mit Searchbox verknüpft, "this" weil function ein object ist */}
                <Scroll> {/* wir wollen, dass die CardList scrollbar ist, sodass die Searchbar sticky ist */}
                    {/* wenn CardList nicht geladen werden, dann kommt die Fehlermeldung */}
                    <ErrorBoundry> 
                        <CardList robots={filteredRobots}/> {/* jetzt wird robots nicht von ganz oben aufgerufen, sondern auch aus state, filteredRobots kann nun mit den robots.js kommunizieren */}
                    </ErrorBoundry>
                </Scroll>          
            </div>
        );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
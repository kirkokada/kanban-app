import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';

import connect from '../libs/connect';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do Laundry'
        }
      ]
    };
  }

  render() {
    // ES6: extracts notes property from state object into variable 'notes'
    const {notes} = this.state;

    return (
      <div>
        {this.props.test}
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }

  // Anonymous function stored in variable
  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }

  activateNoteEdit = (id) => {
    this.setState({
      notes: this.updateNote(id, (note) => {
        note.editing = true;
      })
    });
  }

  editNote = (id, task) => {
    this.setState({
      notes: this.updateNote(id, (note) => {
        note.editing = false;
        note.task = task;
      })
    });
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  updateNote = (id, func) => {
    return this.state.notes.map(note=> {
      if(note.id === id) {
        func(note);
      }

      return note;
    })
  }
}

export default connect(() => ({
  test: 'test'
}))(App)

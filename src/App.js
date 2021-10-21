import { Component } from "react";
import s from "./App.module.css";
import ContactForm from "./components/Form/form";
import ContactList from "./components/List/list";
import Filter from "./components/Filter/filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  formSubmit = (obj) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === obj.name.toLowerCase()
      )
    ) {
      return alert("This contact has already been added to the list");
    }

    this.setState(({ contacts }) => ({
      contacts: [obj, ...contacts],
    }));
  };

  componentDidMount() {
    console.log('App component did mount');
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

  if(parsedContacts) {
    this.setState({contacts: parsedContacts});
  }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App component did update');
    
    if(this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле contacts');
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
    // console.log(prevProps);
    // console.log(this.state)
  }

  handleContacts = () => {
    const { filter, contacts } = this.state;
    const onContactsFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(onContactsFilter)
    );
  };

  filterChange = (evt) => {
    this.setState({ filter: evt.target.value });
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { deleteContact, formSubmit, filterChange } = this;
    const { filter } = this.state;
    const getContacts = this.handleContacts();
    return (
      <div className={s.App}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm formSubmit={formSubmit} />
        <h2 className={s.title}>Contacts</h2>
        <Filter filter={filter} onFilterChange={filterChange} />
        <ContactList getContacts={getContacts} deleteContact={deleteContact} />
      </div>
    );
  }
}

export default App;


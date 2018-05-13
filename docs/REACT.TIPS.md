A way to collect form data without `FormData` api.

https://gist.github.com/everdimension/87228e9ebab82b84afcdc7794fde3bfd

```
handleSubmit(event) {
  const form = event.target;
  const data = {}
  for (let element of form.elements) {
    if (element.tagName === 'BUTTON') { continue; }
    data[element.name] = element.value;
  }
}
```

With formData() api

```
handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }
  ```
## Dynamic binding with the Arrow Function for multiple elements

Ref : https://medium.freecodecamp.org/the-best-way-to-bind-event-handlers-in-react-282db2cf1530
```
class HelloWorld extends Component {
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }
  render() {
    return (
      <input onChange={this.handleChange('name')}/>
      <input onChange={this.handleChange('description')}/>
    )
  }
}

// For more better performance
class HelloWorld extends Component {
  handleChange = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        this.setState({ [name]: event.target.value });
      };
    }
    return this.handlers[name];  
  } 
  render() {
    return (
      <input onChange={this.handleChange('name')}/>
      <input onChange={this.handleChange('description')}/>
    )
  }
}
```

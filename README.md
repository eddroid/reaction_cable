# React + ActionCable = ReactionCable

This is a sample app I live-coded for the Miami Ruby Brigade that mixes React and Rails ActionCable. It implements a ViewModel pattern where any updates to the model are broadcast to all browsers, triggering an immediate update on the page, without the user having to click Refresh.

## Server-side 

### Model

The `Task` model broadcasts all updates to a `TasksChannel`.

### View

The Rails view renders a React component using `react-rails`'s `react_component` view helper. The component accepts a JSON `task` object, some decorative attributes (for CSS purposes), and a `prerender` flag (for SEO... or something).

## Client-side

The React component was scaffolded with:

```sh
rails g react:component Task task:object --es6
```

...then updated to look like a standard Rails view partial, replacing all instances of, for example:

```rb
<%= task.name %>
```

...with 
```js
{ this.props.task.name }
```

Then comes the complicated part. Using React lifecycle methods, we attach the ActionCable.

When the component mounts (`componentDidMount`), subscribe to the ActionCable socket. When the component unmounts (`componentWillUnmount`), unsubscribe from the ActionCable socket.

### ... with style

I wanted real-time updates to the component to be more noticeable, so I use a yellow flash to indicate the the component has been updated. The flash is initialized when the component mounts, and triggered whenever the component updates (`componentDidUpdate`).

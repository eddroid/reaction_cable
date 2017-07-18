class Task extends React.Component {
  // helper methods
  constructor() {
    super()
    this.className = this.constructor.name
    this.channelName = this.className + 'sChannel'
  }
  get objectId() {
    return this.props.task.id
  }
  get domId() {
    // Rails dom_id
    return this.className.toLowerCase() + '_' + this.objectId
  }

  // React lifecycle methods
  componentDidMount() {
    console.log('component mount')
    this.initFlash()
    this.subscribe()
  }
  componentWillUnmount() {
    console.log('component unmount')
    this.unsubscribe()
  }
  componentDidUpdate() {
    console.log('component update')
    this.flash()
  }

  // ActionCable methods
  subscribe() {
    console.log('subscribe to ' + this.channelName
      + ', id: ' + this.objectId)
    let className = this.className, domId = this.domId

    this.subscription = App.tasks = App.cable.subscriptions.create(
      {channel: this.channelName, id: this.objectId}, {
      connected: function() {
        console.log('connected')
      },
      disconnected: function() {
        console.log('disconnected')
      },
      rejected: function() {
        console.log('rejected')
      },
      received: function(task) {
        console.log('received')
        console.dir(task)

        // Rails' dom_id
        var root = document.getElementById(domId)
        if (root) {
          ReactDOM.render(<Task task={task}/>, root)
        }
      }

    });

  }
  unsubscribe() {
    if (this.subscription) {
      console.log('unsubscribe from ' + this.channelName +
        ', id: ' + this.objectId)
      App.cable.subscriptions.remove(this.subscription)
      this.subscription = undefined
    }
  }

  // flash highlight methods
  initFlash() {
    var node = ReactDOM.findDOMNode(this)
    node.addEventListener('animationend', function(evt) {
      console.log('css animation end')
      if (evt.animationName === 'highlight') {
        // TODO: remove highlight from the class
        node.className = ''
      }
    })
  }
  flash() {
    // TODO: append highlight to the existing class
    ReactDOM.findDOMNode(this).className = 'highlight'
  }

  render () {
    return (
      <div>
        <p>
          <strong>Name:</strong>
          { this.props.task.name }
        </p>

        <p>
          <strong>Description:</strong>
          { this.props.task.description }
        </p>

        <p>
          <strong>Updated at:</strong>
          { this.props.task.updated_at }
        </p>

      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object
};

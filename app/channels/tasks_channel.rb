class TasksChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    puts "subscribed"
    stream_for Task.find(params[:id])
    # stream_from Task
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    puts "unsubscribed"
  end
end

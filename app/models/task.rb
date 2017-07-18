class Task < ApplicationRecord
  after_save :broadcast
  after_touch :broadcast # debugging

  private
  def broadcast
    TasksChannel.broadcast_to self, self
    # TasksChannel.broadcast self.class, self
  end
end

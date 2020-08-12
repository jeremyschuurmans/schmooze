class MessagesController < ApplicationController
  def index
    load_messages
  end

  def create
    @message = Message.new(message_params)
    @message.save
    ActionCable.server.broadcast("message_channel", content: @message.content)
    # render json: Array.wrap(@message)
    load_messages
  end

    private

    def message_params
      params.require(:message).permit(:content)
    end

    def load_messages
      @messages = Message.all
      render json: @messages
    end
end

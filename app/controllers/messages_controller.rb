class MessagesController < ApplicationController
  def index
    load_messages
  end

  def create
    @message = Message.new(message_params)
    @message.save
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

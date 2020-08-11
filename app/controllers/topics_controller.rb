class TopicsController < ApplicationController
  def index
    load_topics
  end

  def create
    @topic = Topic.new(topic_params)
    @topic.save
    load_topics
  end

    private

    def topic_params
      params.require(:topic).permit(:name)
    end

    def load_topics
      @topics = Topic.all
      render json: @topics
    end
end

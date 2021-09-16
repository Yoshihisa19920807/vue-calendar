class CalendarsController < ApplicationController
  def index
    # イベントデータの一覧を返す
    render json: Calendar.all
  end

  def show
    render json: Calendar.find(params[:id])
  end

  def create
    # パラメータの値でイベントデータを作成する
    calendar = Calendar.new(calendar_params)
    if calendar.save
      render json: calendar
    else
      render json: calendar.errors, status: 422
    end
  end

  def update
    # パラメータの値でイベントデータを更新する
    calendar = Calendar.find(params[:id])
    if calendar.update(calendar_params)
      render json: calendar
    else
      render json: calendar.errors, status: 422
    end
  end

  def destroy
    # パラメータの値でイベントデータを更新する
    calendar = Calendar.find(params[:id])
    # if calendar.destroy
    #   render json: Event.all
    # else
    #   render json: calendar.errors, status: 422
    # end
    calendar.destroy!
    render json: calendar
  end

  private

  def calendar_params
    params.require(:calendar).permit(:id, :name, :is_show, :color)
  end

end

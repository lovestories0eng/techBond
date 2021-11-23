# encoding:utf-8
from flask import Flask, request, jsonify
import akshare as ak
from flask_cors import CORS
import pandas as pd
import tushare as ts
import talib as ta

#正常显示画图时出现的中文和负号
from pylab import mpl
mpl.rcParams['font.sans-serif']=['SimHei']
mpl.rcParams['axes.unicode_minus']=False

#引入TA-Lib库
import talib as ta

app = Flask(__name__)
CORS(app, resources=r'/*')  # 注册CORS, "/*" 允许访问所有api

#设置token
token='15e164e74f082e80c989dfb93b1d937ee95b83ea78b2c5bf1d5db211'
pro=ts.pro_api(token)

index={'上证综指': '000001.SH','深证成指': '399001.SZ',
        '沪深300': '000300.SH','创业板指': '399006.SZ',
        '上证50': '000016.SH','中证500': '000905.SH',
        '中小板指': '399005.SZ','上证180': '000010.SH'}

#获取当前交易的股票代码和名称
def get_code():
    df = pro.stock_basic(exchange='', list_status='L')
    codes=df.ts_code.values
    names=df.name.values
    stock=dict(zip(names,codes))
    stocks=dict(stock,**index)
    return stocks

#默认设定时间周期为当前时间往前推120个交易日
#日期可以根据需要自己改动
def get_data(code,n=120):
    from datetime import datetime,timedelta
    t=datetime.now()
    t0=t-timedelta(n)
    start=t0.strftime('%Y%m%d')
    end=t.strftime('%Y%m%d')
    #如果代码在字典index里，则取的是指数数据
    if code in index.values():
        df=pro.index_daily(ts_code=code,start_date=start, end_date=end)
    #否则取的是个股数据
    else:
        df=pro.daily(ts_code=code, start_date=start, end_date=end)
    #将交易日期设置为索引值
    df.index=pd.to_datetime(df.trade_date)
    df=df.sort_index()
    #计算收益率
    return df

#计算AR、BR指标
def arbr(stock,n=120):
    code=get_code()[stock]
    df=get_data(code,n)[['open','high','low','close']]
    df['HO']=df.high-df.open
    df['OL']=df.open-df.low
    df['HCY']=df.high-df.close.shift(1)
    df['CYL']=df.close.shift(1)-df.low
    #计算AR、BR指标
    df['AR']=ta.SUM(df.HO, timeperiod=26)/ta.SUM(df.OL, timeperiod=26)*100
    df['BR']=ta.SUM(df.HCY, timeperiod=26)/ta.SUM(df.CYL, timeperiod=26)*100
    return df[['close','AR','BR']].dropna()

@app.route('/axios', methods=["GET", "POST"])
def axios():
    vip = request.args.get('vip')
    level = request.args.get('level')
    stock_szse_summary_df = ak.stock_szse_summary(date="20200619")
    print(stock_szse_summary_df)
    return stock_szse_summary_df.to_json()


@app.route('/home/ssebond_day', methods=["GET", "POST"])
def ssebond_day():
    date = request.args.get('date')
    stock_szse_summary = ak.stock_szse_summary(date=date)
    print(stock_szse_summary)
    return stock_szse_summary.to_json()


@app.route('/home/sse_deal_daily', methods=["GET", "POST"])
def ssedeal_day():
    date = request.args.get('date')
    stock_sse_deal_daily_df = ak.stock_sse_deal_daily(date=date)
    print(stock_sse_deal_daily_df)
    return stock_sse_deal_daily_df.to_json()


@app.route('/home/sse_index', methods=["GET", "POST"])
def sse_index():
    stock_zh_index_daily_df = ak.stock_zh_index_daily(symbol="sh000001")
    for i in range(len(stock_zh_index_daily_df)):
        stock_zh_index_daily_df['date'][i] = str(
            stock_zh_index_daily_df['date'][i])
    stock_zh_index_daily_df = stock_zh_index_daily_df.loc[:, [
        'date', 'open', 'close', 'low', 'high', 'volume']]
    print(stock_zh_index_daily_df)
    return stock_zh_index_daily_df.to_json()

@app.route('/home/general_picture', methods=["GET", "POST"])
def general_picture():
    date = request.args.get('date')
    df = pro.index_dailybasic(trade_date=date)
    df.columns = ['TS代码', '交易日期', '当日总市值', '当日流通市值', '当日总股本', '当日流通股本', 
        '当日自由流通股本', '换手率', '换手率(基于自由流通股本)', '市盈率', '市盈率TTM', '市净率']
    
    print(df)
    return df.to_json()

@app.route('/home/motion_index', methods=["GET", "POST"])
def motion_index():
    name = request.args.get('name')
    stock = arbr(name)
    stock['date'] = stock.index.strftime("%Y-%m-%d")
    return stock.to_json()


if __name__ == '__main__':
    app.run(debug=True)
    # app.run(debug=True,host='0.0.0.0',port=5000)
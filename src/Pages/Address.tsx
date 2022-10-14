import React from "react";
import Map from "../Components/uiComponents/Map";

const Address: React.FC = () => {
  return (
    <div className="min-h-[120rem] w-full  px-36">
      <div className="w-full h-full bg-slate-100 p-28">
        <h1 className="text-5xl font-semibold pb-32">地址及營業時間</h1>
        <div className="h-[60rem] flex flex-row mb-32">
          <div className="h-full w-[30rem] min-w-[20rem] border-solid border-r">
            <h1 className=" text-4xl font-medium">地圖與地址</h1>
          </div>
          <div className="h-full flex-1 min-w-[50rem] px-28 ">
            <Map
              className="h-4/6 w-9/12 min-w-[40rem]"
              center={{ lat: 22.278479344889483, lng: 114.16256149096291 }}
              zoom={16}
            />
            <div className="p-6">
              <h3>電話號碼：23456789</h3>
              <h3>香港香港島中西區中環紅棉路10號</h3>
            </div>
          </div>
        </div>
        <div className="h-[30rem] flex flex-row">
          <div className="h-full w-[30rem] min-w-[20rem] border-solid border-r">
            <h1 className=" text-4xl font-medium">營業時間</h1>
          </div>
          <div className="h-full flex-1 min-w-[50rem] px-28 ">
            <div className="p-6">
              <h3>星期一至日: 10:00am – 8:00pm</h3>
              <h3>聖誕前夕及農曆新年除夕: 10:00am – 5:00pm</h3>
              <h3>農曆年初一及二休息</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

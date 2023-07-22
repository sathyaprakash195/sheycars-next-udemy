"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import General from "@/components/profileComponents/General";
import Cars from "@/components/profileComponents/Cars";
import Users from "@/components/profileComponents/Users";
import BookingsTable from "@/components/profileComponents/BookingsTable";


function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    currentUser && (
      <div className="p-5">
        <Tabs defaultActiveKey="1">
          {/* tabs for normal user */}

          {currentUser.isAdmin === false && (
            <>
              <Tabs.TabPane tab="General" key="1">
                <General />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Bookings" key="2">
                <BookingsTable />
              </Tabs.TabPane>
            </>
          )}

          {currentUser.isAdmin && (
            <>
              <Tabs.TabPane tab="General" key="1">
                <General />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Cars" key="2">
                <Cars />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Users" key="3">
                <Users />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Bookings" key="4">
                <BookingsTable />
              </Tabs.TabPane>
            </>
          )}
        </Tabs>
      </div>
    )
  );
}

export default Profile;

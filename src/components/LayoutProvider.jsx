"use client";
import { ConfigProvider, message } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { SetCurrentUser } from "@/redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { SetLoading } from "@/redux/loadersSlice";

function LayoutProvider({ children }) {
  const { currentUser } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loaders);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.get("/api/users/logout");
      message.success("User logged out successfully");
      router.push("/login");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      getCurrentUser();
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        {loading && <Spinner />}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#000",
            },
          }}
        >
          {pathname !== "/login" && pathname !== "/register" && (
            <div className="header bg-primary p-5 flex justify-between items-center">
              <h1
                className="text-xl text-white cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                SHEYCARS
              </h1>

              <div className="flex gap-5 items-center">
                <h1
                  className="text-md text-white underline"
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  {currentUser?.name}
                </h1>
                <i
                  className="ri-logout-box-r-line text-white"
                  onClick={onLogout}
                ></i>
              </div>
            </div>
          )}
          <div>{children}</div>
        </ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;

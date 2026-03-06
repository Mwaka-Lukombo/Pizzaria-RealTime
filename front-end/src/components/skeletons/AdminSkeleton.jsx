import {
  Box,
  Motorbike,
  Users
} from "lucide-react";

export const AdminSkeleton = () => {

  return (
    <div className="flex">

      
      <aside className="w-[250px] h-screen fixed left-0 top-0 bg-base-300 z-20 skeleton">
        <div className="py-[50px] px-4">
        
        <div className="w-full my-16">
           <div className="flex items-center justify-center">
             <div className="w-[50px] h-[50px] skeleton rounded-full bg-black/10 mb-3"></div>
           </div>
           <div className="w-full h-[30px] skeleton bg-black/10 mb-3"></div>
           <div className="w-full h-[30px] skeleton bg-black/10 mb-3"></div>
           <div className="w-full h-[30px] skeleton bg-black/10 mb-3"></div>
        </div>
        </div>
      </aside>


      
      <main className="ml-[250px] w-full min-h-screen px-6">

      
        <div className="grid grid-cols-3 gap-4 my-6">

      
          <div className="h-[200px] flex items-center justify-center bg-base-200 skeleton rounded-xl shadow-xl border border-gray-300">
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[50px] skeleton"></div>

              <h3 className="text-3xl font-bold"></h3>
              <p className="text-xl font-semibold w-[100px] h-[30px] skeleton my-3"></p>
            </div>
          </div>

                    <div className="h-[200px] flex items-center justify-center bg-base-200 skeleton rounded-xl shadow-xl border border-gray-300">
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[50px] skeleton"></div>

              <h3 className="text-3xl font-bold"></h3>
              <p className="text-xl font-semibold w-[100px] h-[30px] skeleton my-3"></p>
            </div>
          </div>

                    <div className="h-[200px] flex items-center justify-center bg-base-200 skeleton rounded-xl shadow-xl border border-gray-300">
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[50px] skeleton"></div>

              <h3 className="text-3xl font-bold"></h3>
              <p className="text-xl font-semibold w-[100px] h-[30px] skeleton my-3"></p>
            </div>
          </div>

        </div>


        {/* TABLE SECTION */}
        <div className="my-7">

          <div className="overflow-x-auto">

            <table className="table">

              <thead>
                <tr className="w-full h-[15px] bg-black/10 skeleton">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                <tr className="w-full h-full bg-black/10 skeleton">
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="btn btn-md bg-error bg-black/10 skeleton">
                    </button>
                  </td>
                </tr>
                <tr className="w-full h-full bg-black/10 skeleton">
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="btn btn-md bg-error bg-black/10 skeleton">
                    </button>
                  </td>
                </tr>
                <tr className="w-full h-full bg-black/10 skeleton">
                  <th></th>
                  <td className="w-full"></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="btn btn-md bg-error bg-black/10 skeleton">
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>

            {/* PAGINATION */}
            <div className="flex justify-center my-4">
              <div className="join">
                {/* pagination skeleton */}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
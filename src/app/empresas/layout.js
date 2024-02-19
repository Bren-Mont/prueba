import NextBreadcrumb from "./Breadcrumbs";
import Menu from "./Menu";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />

      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full bg-slate-100 max-h-full">
        <div className=" w-full flex-none md:w-52 bg-white max-h-full">
          <Menu />
        </div>
        <div className="flex-grow md:overflow-y-auto max-h-full">
          <div className=" w-full h-full flex-none md:h-32 bg-sky-600">
            <NextBreadcrumb
              containerClasses="breadcrumbs-container" 
              listClasses="breadcrumbs-list" 
              activeClasses="breadcrumbs-active" 
              capitalizeLinks={true} 
                      
            />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

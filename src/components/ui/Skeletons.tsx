

const NavbarSkeleton = () => (
  <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
    <div className="w-32 h-8 bg-white/10 rounded-md animate-pulse"></div>
    <div className="hidden md:flex space-x-6">
      <div className="w-16 h-4 bg-white/10 rounded animate-pulse"></div>
      <div className="w-16 h-4 bg-white/10 rounded animate-pulse"></div>
      <div className="w-16 h-4 bg-white/10 rounded animate-pulse"></div>
    </div>
    <div className="w-24 h-10 bg-white/10 rounded-full animate-pulse"></div>
  </div>
);

export const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#020703] relative overflow-hidden">
      <NavbarSkeleton />
      <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32">
        <div className="w-3/4 max-w-4xl h-24 md:h-32 bg-white/5 rounded-2xl animate-pulse mb-8"></div>
        <div className="w-2/4 max-w-2xl h-16 md:h-20 bg-white/5 rounded-xl animate-pulse mb-8"></div>
        <div className="w-3/4 max-w-xl h-6 bg-white/5 rounded animate-pulse mb-3"></div>
        <div className="w-2/4 max-w-lg h-6 bg-white/5 rounded animate-pulse mb-8"></div>
        <div className="flex gap-4">
          <div className="w-40 h-12 bg-white/10 rounded-full animate-pulse"></div>
          <div className="w-32 h-12 bg-white/5 rounded-full animate-pulse border border-white/10"></div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 h-14 bg-white/5 animate-pulse border-y border-white/10"></div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#020703] relative">
      <NavbarSkeleton />
      <div className="pt-32 max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-3/4 max-w-2xl h-12 md:h-16 bg-white/5 rounded-xl animate-pulse mb-6"></div>
          <div className="w-1/2 max-w-lg h-6 bg-white/5 rounded animate-pulse mb-2"></div>
          <div className="w-2/3 max-w-xl h-6 bg-white/5 rounded animate-pulse"></div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-white/5 border border-white/10 rounded-2xl animate-pulse p-6 flex flex-col">
              <div className="w-1/2 h-8 bg-white/10 rounded mb-4"></div>
              <div className="w-full h-4 bg-white/5 rounded mb-2"></div>
              <div className="w-5/6 h-4 bg-white/5 rounded mb-8"></div>
              <div className="space-y-4 mb-8 flex-grow">
                <div className="w-3/4 h-4 bg-white/5 rounded"></div>
                <div className="w-4/5 h-4 bg-white/5 rounded"></div>
                <div className="w-2/3 h-4 bg-white/5 rounded"></div>
              </div>
              <div className="w-full h-12 bg-white/10 rounded-full mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#020703] relative">
      <NavbarSkeleton />
      <div className="pt-24 md:pt-32 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <div className="w-32 h-6 bg-primary/20 rounded-full animate-pulse mb-4"></div>
          <div className="w-1/2 max-w-md h-10 md:h-12 bg-white/5 rounded-xl animate-pulse mb-4"></div>
          <div className="w-1/3 max-w-xs h-6 bg-white/5 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-2xl animate-pulse p-6">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-24 h-4 bg-white/10 rounded"></div>
                 <div className="w-8 h-8 rounded-full bg-white/10"></div>
               </div>
               <div className="w-32 h-8 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 w-full">
          <div className="lg:col-span-8 h-[400px] bg-white/5 border border-white/10 rounded-2xl animate-pulse"></div>
          <div className="lg:col-span-4 h-[400px] bg-white/5 border border-white/10 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

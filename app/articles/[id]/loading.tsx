import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
    return (
        <div className="p-6">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      );
}

export default loading;
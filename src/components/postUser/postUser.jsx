import { getUser } from "@/lib/data";
import Image from "next/image";

const PostUser = async ({ userId }) => {
  // Handle sample data case
  if (userId === "sample-user") {
    return (
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src="/avatar.png"
          alt="Sample Author"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Author</span>
          <span className="text-sm font-semibold text-gray-900">Creative Minds Team</span>
        </div>
      </div>
    );
  }

  try {
    const user = await getUser(userId);

    if (!user) {
      return (
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src="/no-avatar.png"
            alt="Unknown Author"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Author</span>
            <span className="text-sm font-semibold text-gray-900">Unknown Author</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src={user.img ? user.img : "/no-avatar.png"}
          alt={user.username}
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Author</span>
          <span className="text-sm font-semibold text-gray-900">{user.username}</span>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return (
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src="/no-avatar.png"
          alt="Unknown Author"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Author</span>
          <span className="text-sm font-semibold text-gray-900">Unknown Author</span>
        </div>
      </div>
    );
  }
};

export default PostUser;

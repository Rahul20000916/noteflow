'use client'
import Index from '@/components/Index';
import PostCard from '@/components/PostCard'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  tag: {
    id: string;
    name: string;
  };
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const id = session?.user?.email
        const response = await axios.get(`/api/posts/all/${id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, [session]); 
  if (status === 'loading') {
    return <div className='text-center mt-11'>
      <span className='loading loading-spinner'>Loading...</span>
      </div>
  }

  if (!session) {
    return <Index />;
  }

  return (
    <main className='grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
      {posts &&
        posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}

    </main>
  );
}

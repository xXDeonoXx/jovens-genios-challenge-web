import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import NewTopicForm from '../../components/Pages/Teacher/NewTopicForm';
import { AuthContext } from '../../contexts/AuthContext';
import { io } from 'socket.io-client';

const ws = io('ws://127.0.0.1:4000/topics');

interface Topic {
  id: string;
  name: string;
}

const Teacher: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    ws.on('connect', (data: any) => {
      console.log('Conectado ao socket');
      setTopics(data);
    });
    ws.on('UpdateTopicsList', (data: any) => {
      setTopics(data);
    });
  }, []);

  return (
    <div className='w-screen h-screen bg-fill flex justify-center flex-col items-center'>
      <Modal
        title='Novo Tópico'
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <NewTopicForm
          onSubmit={(data) => {
            setShowModal(false);
            ws.emit('NewTopic', data);
          }}
        />
      </Modal>
      <h1 className='text-2xl my-4'>
        Bem vindo <span className='font-semibold'>{user?.name}</span>
      </h1>
      <div className='bg-white rounded-lg p-8 w-2/3 flex flex-col items-center shadow-lg'>
        <div className='w-full flex flex-col '>
          <div className='w-full mb-8'>
            <Button
              label='Novo Tópico +'
              onClick={() => {
                setShowModal(true);
              }}
            />
          </div>
          <div className='w-full flex flex-wrap justify-between'>
            {topics.map((topic, id) => {
              return (
                <Button
                  className='w-60 my-2'
                  key={id}
                  label={topic.name}
                  onClick={() => {
                    router.push(`teacher/topic/${topic.id}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;

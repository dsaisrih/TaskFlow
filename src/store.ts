export const authState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null')
};

const subscribers: Function[] = [];

export function onAuthStateChanged(cb: Function) {
  subscribers.push(cb);
  cb(authState.currentUser);
  return () => {
    const idx = subscribers.indexOf(cb);
    if (idx > -1) subscribers.splice(idx, 1);
  };
}

function notifyAuthChanged() {
  localStorage.setItem('currentUser', JSON.stringify(authState.currentUser));
  subscribers.forEach(cb => cb(authState.currentUser));
}

export async function signIn(username: string, password: string) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 500));
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username] && users[username].password === password) {
    authState.currentUser = { uid: username, username };
    notifyAuthChanged();
  } else {
    throw new Error("Invalid name or password. Are you sure you registered?");
  }
}

export async function register(username: string, password: string) {
  await new Promise(r => setTimeout(r, 500));
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) throw new Error("Name already registered. Try signing in.");
  if (password.length < 6) throw new Error("Password must be at least 6 characters.");
  users[username] = { password };
  localStorage.setItem('users', JSON.stringify(users));
  authState.currentUser = { uid: username, username };
  notifyAuthChanged();
}

export async function signOut() {
  authState.currentUser = null;
  notifyAuthChanged();
}

// Database Mock
let dbSubscribers: Record<string, Function[]> = {};

export function getTodos(uid: string) {
  const allTodos = JSON.parse(localStorage.getItem('todos') || '{}');
  return allTodos[uid] || {};
}

function saveTodos(uid: string, todos: any) {
  const allTodos = JSON.parse(localStorage.getItem('todos') || '{}');
  allTodos[uid] = todos;
  localStorage.setItem('todos', JSON.stringify(allTodos));
  if (dbSubscribers[uid]) {
    dbSubscribers[uid].forEach(cb => cb(todos));
  }
}

export function subscribeTodos(uid: string, cb: Function) {
  if (!dbSubscribers[uid]) dbSubscribers[uid] = [];
  dbSubscribers[uid].push(cb);
  cb(getTodos(uid));
  return () => {
    dbSubscribers[uid] = dbSubscribers[uid].filter(fn => fn !== cb);
  };
}

export function addTodo(uid: string, title: string, dueDate?: string) {
  const todos = getTodos(uid);
  const id = Date.now().toString() + Math.random().toString(36).substring(7);
  todos[id] = { id, title, completed: false, createdAt: Date.now(), dueDate: dueDate || null };
  saveTodos(uid, todos);
}

export function updateTodo(uid: string, id: string, updates: any) {
  const todos = getTodos(uid);
  if (todos[id]) {
    todos[id] = { ...todos[id], ...updates };
    saveTodos(uid, todos);
  }
}

export function deleteTodo(uid: string, id: string) {
  const todos = getTodos(uid);
  delete todos[id];
  saveTodos(uid, todos);
}

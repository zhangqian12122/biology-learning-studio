// 静态版（GitHub Pages）垫片：服务端动作不可用，全部改为本机 no-op。
// 题库数据保存在各自浏览器的 localStorage 中。
export async function recordAnswer(): Promise<void> {}
export async function getTeacherSetupState(): Promise<{ hasPasscode: boolean }> {
  return { hasPasscode: false };
}
export async function setupTeacherPasscode(): Promise<void> {}
export async function loginTeacher(): Promise<{ ok: true }> {
  return { ok: true };
}
export async function saveQuestion(): Promise<void> {}
export async function setQuestionStatus(): Promise<void> {}
export async function getTeacherData(): Promise<{ questions: [] }> {
  return { questions: [] };
}

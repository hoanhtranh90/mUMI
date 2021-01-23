export function convertActionLogToHistory(actionLog) {
  const data = actionLog.dataJson ? JSON.parse(actionLog.dataJson) : undefined;
  let extraData;
  let content = actionLog.comment;
  let attachments = null;

  if (actionLog.actionName === 'TASK_UPDATE_TASK_PROGRESS' && data) {
    content = data.tkTaskReport.reportContent;
    attachments = data.vbAttachments;
    extraData = {
      completionPercent: data.tkTaskReport.completionPercent,
      oldCompletionPercent: data.tkTaskReport.oldCompletionPercent,
    };
  }

  return {
    content,
    attachments,
    extraData,
    id: actionLog.id,
    actionName: actionLog.actionName,
    creatorName: actionLog.creatorName,
    creatorId: actionLog.creatorId,
    createTime: actionLog.createTime,
    dataType: 'actionLog',
  };
}

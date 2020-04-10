/**
 * Indica o estado atual do projeto.
 */
enum ProjectStatus {
  /**
   * Indica que o projeto está em andamento.
   */
  OnGoing = 'on-going',
  /**
   * Indica que o projeto está paralisado.
   */
  OnHold = 'on-hold',
  /**
   * Indica que o projeto foi encerrado.
   */
  Ended = 'ended',
}

export default ProjectStatus;
